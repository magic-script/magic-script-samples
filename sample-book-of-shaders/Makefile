# Guess current mlsdk root folder based on path to mabu
MLSDK = $(shell dirname $(shell which mabu))
# Extract the package name from the manifest.xml file
APPNAME = $(shell grep -P -o -e '(?<=ml:package=").*?(?=")' manifest.xml)

.PHONY: clean build install run stop log debug

build: .out/app/app.mpk

# Build and install the app
install: .out/app/app.mpk
	mldb install -u $<

# Run the app on the device
run: install
	mldb launch -w -v INSPECTOR_PORT=9229 --auto-net-privs ${APPNAME}

# Run the app on the device
stop:
	mldb terminate ${APPNAME}

# In a separate terminal, keep a log window open
log:
	mldb log -c
	mldb log

debug:
	mldb forward tcp:9229 tcp:9229
	@echo 'Open in chrome:'
	@echo '    chrome-devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws=127.0.0.1:9229'

clean:
	rm -rf .out digest.sha512.signed

.out/app/app.mpk: digest.sha512.signed manifest.xml app.package app.mabu 
	mabu -t lumin app.package

# Generate the digest, append taildata and sign it.
digest.sha512.signed: $(shell find src -name '*.js')
	/bin/echo -ne '#\xc2\xa1\x7fsha512sum -c\n' > $@
	sha512sum $^ >> $@
	/bin/echo -ne '#\0' >> $@
	${MLSDK}/tools/python3/bin/python3.5 \
		${MLSDK}/tools/mabu/src/taildata_v3.py \
		--sbox USER --debuggable $@
	${MLSDK}/tools/signer/sign-file	\
		-f sha512 \
		$(MLCERT:cert=privkey) \
		${MLCERT} \
		$@

