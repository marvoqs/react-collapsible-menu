import React from "react";

import MenuItem from "./components/MenuItem";
import IntersectionObserverWrapper from "./intersection-observer-wrapper";

export default function IconLabelButtons() {
  return (
    <IntersectionObserverWrapper>
      <MenuItem data-targetid="talk">Talk</MenuItem>
      <MenuItem data-targetid="save">Save</MenuItem>
      <MenuItem data-targetid="upload">Upload</MenuItem>
      <MenuItem data-targetid="download">Download</MenuItem>
      <MenuItem data-targetid="send">Send</MenuItem>
      <MenuItem data-targetid="star">Star</MenuItem>
      <MenuItem data-targetid="mark-as-read">Mark as Read</MenuItem>
      <MenuItem data-targetid="archive">Archive</MenuItem>
      <MenuItem data-targetid="delete">Delete</MenuItem>
    </IntersectionObserverWrapper>
  );
}
