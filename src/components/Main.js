require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let imageDatas = require('../data/imagesData.json');

// 利用自执行函数，将图片名信息转成图片URL
imageDatas = (function genImageURL(imageDataArr) {
  for(let i = 0, len = imageDataArr.length; i < len; i++){
    let singleImageData = imageDataArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDataArr[i] = singleImageData;
  }
  return imageDataArr;
})(imageDatas);


let ImgFigure = React.createClass({
  render: function () {

    return(<figure className="img-figure">
      <img src={this.props.data.imageURL}
      alt={this.props.data.title}/>
      <figcaption>
        <h2 className="img-title">{this.props.data.title}</h2>
      </figcaption>
    </figure>);
  }
  }
);


class AppComponent extends React.Component {

  Constant: {
    centerPos: {
      left: 0,
      right: 0
    },
    hPosRange: {
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: {
      x: [0, 0],
      topY: [0, 0]
    }
  }

  rearrange(centerIndex) {

  }

  getInitialStage() {
    return {
      imgsArrangeAee: [

      ]

  }

  componentDidMount() {
    let stageDOM = React.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    let imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    this.Constant.centerPos = {
      left : halfStageW - halfImgW,
      top: halfStageH = halfImgH

    };

    this.Constant.hPosRange.leftSecX[0] = 0 - halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW - halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = 0 - halfImgH;
    this.Constant.hPosRange.y[0] = stageH - halfImgH;

    this.Constant.hPosRange.topY[0] = 0 - halfImgH;
    this.Constant.hPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.hPosRange.x[0] = halfStageW - imgW;
    this.Constant.hPosRange.x[0] = halfImgW;

    this.rearrange(0);
  }

  render() {
    let controllerUnits = [], imgFigures = [];

    for(let i in imageDatas) {
      imgFigures.push(<ImgFigure data={imageDatas[i]} ref={'imgFigure' + i}/>)
    }

    // imageDatas.forEach(function (value) {
    //   imgFigures.push(<ImgFigure data={value}/>)
    // });

    return (
      <section className="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
