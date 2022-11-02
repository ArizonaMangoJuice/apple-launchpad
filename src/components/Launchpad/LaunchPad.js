import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import App from "../App";
import data from "../../mockData/data";
import "./LaunchPad.css";
import ItemTypes from "../ItemTypes/ItemTypes";

const LaunchPad = () => {
  const [apps, setApps] = useState(data);
  const findApp = useCallback(
    (id) => {
      const app = apps.filter((a) => `${a.id}` === id)[0];
      return {
        app,
        index: apps.indexOf(app),
      };
    },
    [apps]
  );

  const moveApp = useCallback(
    (id, atIndex) => {
      const { app, index } = findApp(id);
      setApps(
        update(apps, {
          $splice: [
            [index, 1],
            [atIndex, 0, app],
          ],
        })
      );
    },
    [findApp, apps, setApps]
  );

  const [, drop] = useDrop(() => ({ accept: ItemTypes.APP }));
  // const apps = data.map((data) => (<App key={data.name} name={data.name} icon={data.icon}/>))
  return (
    <div ref={drop} className="launch-pad">
      {apps.map((app) => (
        <App
          key={app.id}
          id={`${app.id}`}
          icon={app.icon}
          name={app.name}
          moveApp={moveApp}
          findApp={findApp}
        />
      ))}
    </div>
  );
};

export default LaunchPad;
