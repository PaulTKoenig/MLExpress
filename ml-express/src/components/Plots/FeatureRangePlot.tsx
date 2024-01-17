import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type ScatterPlotProps = {
  data: { x: string; y: number }[];
  width: number;
  height: number;
};

export const FeatureRangePlot: React.FC<ScatterPlotProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.x))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.y)!]).range([innerHeight, 0]);

    const svg = d3.select(svgRef.current);

    // Remove previous elements before rendering
    svg.selectAll('*').remove();

    // Draw circles
    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.x) || 0)
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .attr('fill', 'steelblue');

    // Draw x-axis with rotated labels
    svg
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-0.8em')
      .attr('dy', '0.15em')
      .attr('transform', 'rotate(-45)');

    // Draw y-axis with labels and ticks
    svg
      .append('g')
      .call(d3.axisLeft(yScale).ticks(5)) // Customize the number of ticks as needed
      .selectAll('.tick text')
      .attr('dx', '-0.5em')
      .attr('dy', '0.25em');

    // Add y-axis label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - innerHeight / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Y-Axis Label');
  }, [data, width, height]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      {/* SVG contents will be rendered here */}
    </svg>
  );
};