import React from 'react';
import { View, PageView, GridLayout, Image } from 'magic-script-components';

export class ExamplePageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pageIndex: 0, photoIndex: 0 };
    this.photos = [
      { image: require('../../resources/contact1.jpg') },
      { image: require('../../resources/contact2.jpg') },
      { image: require('../../resources/contact1.jpg') },
      { image: require('../../resources/contact2.jpg') }
    ];
  }

  renderGalleryPage() {
    return (
      <GridLayout key={"page1"} alignment={'center-center'} columns={2} defaultItemPadding={[0.02, 0.02, 0.02, 0.02]}>
        <Image filePath={this.photos[0].image} width={0.2} height={0.2} onClick={event => this.setState({ pageIndex: 1, photoIndex: 0 })} />
        <Image filePath={this.photos[1].image} width={0.2} height={0.2} onClick={event => this.setState({ pageIndex: 1, photoIndex: 1 })} />
        <Image filePath={this.photos[2].image} width={0.2} height={0.2} onClick={event => this.setState({ pageIndex: 1, photoIndex: 2 })} />
        <Image filePath={this.photos[3].image} width={0.2} height={0.2} onClick={event => this.setState({ pageIndex: 1, photoIndex: 3 })} />
      </GridLayout>
    )
  }

  renderPhotoPage(photoIndex) {
    return (
      <Image key={"page2"} filePath={this.photos[photoIndex].image} width={0.5} height={0.5} onClick={event => this.setState({ pageIndex: 0 })} />
    )
  }

  render() {
    const { pageIndex, photoIndex } = this.state
    return (
      <View name='main-view'>
        <PageView alignment={'center-center'} name='page-view' visiblePage={pageIndex}>
          {this.renderGalleryPage()}
          {this.renderPhotoPage(photoIndex)}
        </PageView>
      </View>
    );
  }
}
