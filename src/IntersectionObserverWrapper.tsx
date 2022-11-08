import React from "react";
import styled from "styled-components";

import OverflowMenu from "./components/OverflowMenu";

interface VisibilityMapType {
  [targetid: string]: any;
}

interface UpdatedEntriesType {
  [targetid: string]: boolean;
}

interface Props {
  children: React.ReactNode;
}

const IntersectionObserverWrapper: React.FC<Props> = ({ children }) => {
  const navRef = React.useRef<HTMLDivElement>(null);

  const [visibilityMap, setVisibilityMap] = React.useState<VisibilityMapType>(
    {}
  );

  const handleIntersection: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    const updatedEntries: UpdatedEntriesType = {};
    entries.forEach((entry) => {
      const targetid = (entry.target as HTMLElement).dataset.targetid;
      if (!targetid) return;
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

    // We are adding observers to child elements of the container div
    // with ref as navRef. Notice that we are adding observers
    // only if we have the data attribute targetid on the child elemeent

    const navRefCurrent = navRef.current;

    if (!navRefCurrent) return;

    const items = navRefCurrent.children as HTMLCollectionOf<HTMLElement>;

    if (!items) return;

    Array.from(items).forEach((item) => {
      if (item.dataset.targetid) {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <StyledToolbarWrapper ref={navRef}>
      {React.Children.map(children, (childItem) => {
        const child = childItem as React.ReactElement;

        return React.cloneElement(child, {
          isVisible: !!visibilityMap[child.props["data-targetid"]],
        });
      })}
      <OverflowMenu visibilityMap={visibilityMap}>{children}</OverflowMenu>
    </StyledToolbarWrapper>
  );
};

const StyledToolbarWrapper = styled.div`
  display: flex;
  overflow: hidden;
  padding: 0 20px;
  width: 75%;
`;

export default IntersectionObserverWrapper;
