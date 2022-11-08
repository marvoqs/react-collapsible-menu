import React from "react";
import styled from "styled-components";

import OverflowMenu from "./components/OverflowMenu";

export default function IntersectionObserverWrap({ children }) {
  const navRef = React.useRef(null);

  const [visibilityMap, setVisibilityMap] = React.useState({});

  const handleIntersection = (entries) => {
    const updatedEntries = {};
    entries.forEach((entry) => {
      const targetid = entry.target.dataset.targetid;
      console.log(entry, targetid);
      if (entry.isIntersecting) {
        updatedEntries[targetid] = true;
      } else {
        updatedEntries[targetid] = false;
      }
    });

    setVisibilityMap((prev) => ({
      ...prev,
      ...updatedEntries,
    }));
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: navRef.current,
      threshold: 1,
    });

    // We are addting observers to child elements of the container div
    // with ref as navRef. Notice that we are adding observers
    // only if we have the data attribute observerid on the child elemeent
    Array.from(navRef.current.children).forEach((item) => {
      if (item.dataset.targetid) {
        observer.observe(item);
      }
    });
    return () => observer.disconnect();
  }, []);
  return (
    <StyledToolbarWrapper ref={navRef}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          isVisible: !!visibilityMap[child.props["data-targetid"]],
        });
      })}
      <OverflowMenu visibilityMap={visibilityMap}>{children}</OverflowMenu>
    </StyledToolbarWrapper>
  );
}

const StyledToolbarWrapper = styled.div`
  display: flex;
  overflow: hidden;
  padding: 0 20px;
  width: 75%;
`;
