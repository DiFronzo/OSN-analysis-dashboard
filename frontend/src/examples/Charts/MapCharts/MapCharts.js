import React, { memo } from "react";
import {
  ZoomableGroup,
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

const MapChart = () => {
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
                <Marker coordinates={[-74, 40.7]}>
                  <circle r={12 / position.k} fill="#F53" />
                </Marker>
                <Marker coordinates={[103.8, 1.35]}>
                  <circle r={12 / position.k} fill="#F53" />
                </Marker>
              </>
            )}
        </CustomZoomableGroup>
      </ComposableMap>
  );
};

export default memo(MapChart);
