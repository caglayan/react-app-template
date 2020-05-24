import React from "react";
import CourseSection1 from "./CourseSection1";
import CourseSection2 from "./CourseSection2";
import CourseSection3 from "./CourseSection3";
import { startCreatePublicCourse } from "../Redux/Selectors/courseSelector";
import { connect } from "react-redux";

class CourseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
    console.log("course with ", props.match.params.id);
    props
      .dispatch(startCreatePublicCourse("5df92c57ea9f59862aabd1ab"))
      .then((course) => {})
      .catch((err) => {
        props.showMessages(1, "Bir problem var.");
      });
  }

  componentDidMount() {}

  onResize = (width, height) => {
    console.log(width, height);
    this.setState({
      height: height,
    });
  };

  render() {
    return (
      <div>
        <CourseSection1
          onResize={this.onResize}
          height={this.state.height}
        ></CourseSection1>
        <CourseSection2></CourseSection2>
        <CourseSection3></CourseSection3>
      </div>
    );
  }
}

const CourseContainerCon = connect()(CourseContainer);

export default CourseContainerCon;
