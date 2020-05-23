import React from "react";
import CourseSection1 from "./CourseSection1";
import CourseSection2 from "./CourseSection2";
import CourseSection3 from "./CourseSection3";

export default class CourseContainer2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
  }

  componentDidMount() {}

  onResize = (width, height) => {
    console.log(width, height);
    this.setState({
      height: height
    });
  };

  render() {
    return (
      <div>
      <CourseSection1 onResize={this.onResize} height={this.state.height}></CourseSection1>      
      </div>
    );
  }
}
