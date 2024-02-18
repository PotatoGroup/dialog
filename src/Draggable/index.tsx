import {
  cloneElement,
  Children,
  useState,
  useCallback,
  useRef,
  useMemo,
  isValidElement,
} from "react";

type OffsetType = [number, number];
export interface DragProps {
  inside?: boolean;
  children: React.ReactElement;
}
const Draggable = ({ inside, children }: DragProps) => {
  const { children: childrenProp } = children.props;
  const [transform, setTransform] = useState<string>();
  const rootRef = useRef<HTMLElement>(null);
  const startPosition = useRef<OffsetType>([0, 0]);
  const offset = useRef<OffsetType>([0, 0]);
  const insetThreshold = useRef<[number, number, number, number]>();

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    startPosition.current = [e.clientX, e.clientY];
    const { transform, top, bottom, left, right } = window.getComputedStyle(
      rootRef.current as Element
    );
    const wrapRect = rootRef.current?.parentElement?.getBoundingClientRect();
    const currentRect = rootRef.current?.getBoundingClientRect();
    if (wrapRect && currentRect)
      insetThreshold.current = [
        -((wrapRect?.height - currentRect?.height) / 2 - parseFloat(top)),
        (wrapRect?.width - currentRect?.width) / 2 - parseFloat(right),
        (wrapRect?.height - currentRect?.height) / 2 - parseFloat(bottom),
        -((wrapRect?.width - currentRect?.width) / 2 - parseFloat(left)),
      ];
    if (transform && transform !== "none") {
      const translate = transform?.split(",");
      offset.current = [parseFloat(translate[4]), parseFloat(translate[5])];
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      let dx = e.clientX - startPosition.current[0];
      let dy = e.clientY - startPosition.current[1];
      dx = offset.current[0] + dx;
      dy = offset.current[1] + dy;
      if (inside && insetThreshold.current) {
        if (dx < insetThreshold.current[3]) dx = insetThreshold.current[3];
        if (dx > insetThreshold.current[1]) dx = insetThreshold.current[1];
        if (dy < insetThreshold.current[0]) dy = insetThreshold.current[0];
        if (dy > insetThreshold.current[2]) dy = insetThreshold.current[2];
      }
      requestAnimationFrame(() => setTransform(`translate(${dx}px, ${dy}px)`));
    },
    [inside]
  );

  const onMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, []);

  const bindMouseDown = useCallback((children: Array<React.ReactNode>) => {
    for (let index = 0; index < children.length; index++) {
      let node = children[index];
      if (!isValidElement(node)) continue;
      if ("data-handler" in node.props) {
        children[index] = cloneElement(node, {
          ...node.props,
          onMouseDown,
          style: { ...node.props.style, cursor: "move" },
        });
        return;
      } else if (node.props.children) {
        bindMouseDown(node.props.children);
      }
    }
  }, []);

  const ChildNodes = useMemo(() => {
    const children = Children.toArray(childrenProp);
    bindMouseDown(children);
    return children;
  }, [childrenProp]);

  return cloneElement(children, {
    ...children.props,
    style: { ...children.props.style, transform },
    children: ChildNodes,
    ref: rootRef,
  });
};

export default Draggable;
