"use client";
import React, { useEffect, useState } from "react";
import { Prediction } from "../CustomerCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  predictions: Prediction[];
}

const CustomizedSegment = (props) => {
  const { points } = props;
  return (
    <g>
      {points.map((point, index) => {
        let strokeColor;
        if (index < points.length - 1) {
          const nextPointValue = points[index + 1].value;
          if (nextPointValue < 25) {
            strokeColor = "#ff0000"; // Vermelho
          } else if (nextPointValue < 75) {
            strokeColor = "#808080"; // Cinza
          } else {
            strokeColor = "#008000"; // Verde
          }

          return (
            <line
              key={`line-${index}`}
              strokeWidth={2}
              stroke={strokeColor}
              fill="none"
              x1={point.x}
              y1={point.y}
              x2={points[index + 1].x}
              y2={points[index + 1].y}
            />
          );
        }
        return null;
      })}
    </g>
  );
};

const CustomerChart: React.FC<Props> = ({ predictions }) => {
  const [graphData, setGraphData] = useState<any>([]);

  const convertDate = (date_str) => {
    let dateObj = new Date(date_str);

    // Usando toLocaleDateString para formatar a data para 'dd/mm/yy'
    let formattedDate = dateObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    // Usando toLocaleTimeString para pegar horas e minutos
    let formattedTime = dateObj.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${formattedDate} ${formattedTime}`;
  };

  useEffect(() => {
    setGraphData(() => {
      return predictions.map((prediction) => {
        const date = convertDate(prediction.createdAt);
        const valuePredicted = prediction.predicted;
        return { date, valuePredicted };
      });
    });
    console.log(graphData);
  }, [predictions]);
  return (
    <ResponsiveContainer>
      <LineChart
        width={500}
        height={300}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          dataKey={"valuePredicted"}
          domain={[0, 100]}
          ticks={[0, 25, 50, 75, 100]}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="valuePredicted"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomerChart;
