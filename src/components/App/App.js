import React, { memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes/ItemTypes";
import "./App.css";

const App = memo  (function App({id, name, moveApp, findApp, icon }) {
  const originalIndex = findApp(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.APP,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: DroppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveApp(DroppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveApp]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.APP,
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findApp(id);
          moveApp(draggedId, overIndex);
        }
      },
    }),
    [findApp, moveApp]
  );

  const opacity = isDragging ? 0 : 1;

  return (
    <div className={`app-block ${opacity}`} ref={(node) => drag(drop(node))}>
      <img className="app-image" src={require(`../../images/${icon}`)} alt="" />
      <p className="app-name">{name}</p>
    </div>
  );
});

// const App = ({ name, icon, id }) => {
//   return (
//     <div className="app-block">
//       <img className="app-image" src={require(`../../images/${icon}`)} alt="" />
//       <p className="app-name">{name}</p>
//     </div>
//   );
// };

export default App;
