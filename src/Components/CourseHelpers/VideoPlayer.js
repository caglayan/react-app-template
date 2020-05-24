import React from "react";

import "video-react/dist/video-react.css";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  BigPlayButton
} from "video-react";

export default (props) => {
  let player = null;
  React.useEffect(() => {
    if (player) player.load();
  }, [props.source]);

  React.useEffect(() => {
    player.subscribeToStateChange((state) => {
      props.subscription(state);
    });
  }, []);

  return (
    <Player
      ref={(plyr) => {
        player = plyr;
      }}
      aspectRatio={"16:9"}
      height={500}
      style={{ outline: "" }}
    >
      <source src={props.source ? props.source.sources[0].src : null} />
      <ControlBar autoHide={false}>
        <ReplayControl seconds={10} order={1.1} />
        <ForwardControl seconds={30} order={1.2} />
        <CurrentTimeDisplay order={4.1} />
        <TimeDivider order={4.2} />
        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
        <VolumeMenuButton disabled />
      </ControlBar>
      <BigPlayButton position="center" />
    </Player>
  );
};
