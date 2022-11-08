import styled from "styled-components";

const MenuItem = styled.div`
  display: inline-block;
  display: flex;
  flex: 0 0 auto;
  margin: 0.85rem;

  .visible {
    order: 0;
    visibility: "visible";
    opacity: 1;
  }

  .invisible {
    order: 100;
    visibility: "hidden";
    pointerEvents: "none";
  },
`;

export default MenuItem;
