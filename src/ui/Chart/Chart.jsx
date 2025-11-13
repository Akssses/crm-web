"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import s from "./Chart.module.scss";

const data = [
  { month: "Янв", value: 100 },
  { month: "Фев", value: 150 },
  { month: "Мар", value: 300 },
  { month: "Апр", value: 800 },
  { month: "Май", value: 1100 },
  { month: "Июн", value: 1300 },
  { month: "Июл", value: 1500 },
  { month: "Сен", value: 1450 },
  { month: "Окт", value: 1350 },
  { month: "Ноя", value: 1200 },
  { month: "Дек", value: 1100 },
];

export default function Chart() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={s.tooltip}>
          <p className={s.tooltipDate}>Jun 31, 2024</p>
          <p className={s.tooltipValue}>${data.value}</p>
        </div>
      );
    }
    return null;
  };

  const handleMouseMove = (state) => {
    if (state.isTooltipActive) {
      setHoveredIndex(state.activeTooltipIndex);
    }
  };

  return (
    <div className={s.chartContainer}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          onMouseMove={handleMouseMove}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={true}
            horizontalPoints={[2500, 2000, 1500, 1000, 500, 0]}
          />

          <XAxis
            dataKey="month"
            stroke="#9ca3af"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            stroke="#9ca3af"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 2500]}
            ticks={[0, 500, 1000, 1500, 2000, 2500]}
            tickFormatter={(value) => `$${value}`}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
          />

          {hoveredIndex !== null && (
            <ReferenceLine
              x={data[hoveredIndex]?.month}
              stroke="#d1d5db"
              strokeWidth={1}
            />
          )}

          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#colorValue)"
            dot={false}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
