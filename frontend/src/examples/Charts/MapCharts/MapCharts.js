import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  useZoomPan
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const width = 800;
const height = 600;

const CustomZoomableGroup = ({ children, ...restProps }) => {
  const { mapRef, transformString, position } = useZoomPan(restProps);
  return (
    <g ref={mapRef}>
      <rect width={width} height={height} fill="transparent" />
      <g transform={transformString}>{children(position)}</g>
    </g>
  );
};

const MakeMarkers = ( data, position, color ) => {
  return data.map((n, i) => {
    return (
      <Marker coordinates={n}>
        <circle r={6 / position.k} fill={color[i]} />
      </Marker>
    )
  })
};

function removeNull(array) {
  return array.filter(x => x !== null)
}

const MapChart = (map_arr) => {
  const colors = ["#2ca02c", "#ff7f0e", "#1f77b4"]

  let data_clean = Array.isArray(map_arr["map_arr"]) ? removeNull(map_arr["map_arr"]) : [];
  let colors_palet = data_clean.map(n => colors[Math.floor(Math.random() * 3)])
  return (
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }} width={width} height={height}>
          <CustomZoomableGroup center={[0, 0]}>
            {position => (
              <>
                <Geographies geography={geoUrl} >
                  {({ geographies }) =>
                    geographies.map(geo => (
                      <Geography key={geo.rsmKey} geography={geo} style={{
                        default: {
                          fill: "#D6D6DA",
                          outline: "none"
                        },
                        hover: {
                          fill: "#1098ff",
                          outline: "none"
                        }
                      }} />
                    ))
                  }
                </Geographies>
                {MakeMarkers(data_clean, position, colors_palet)}
              </>
            )}
        </CustomZoomableGroup>
      </ComposableMap>
  );
};

export default memo(MapChart);
