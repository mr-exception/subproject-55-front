import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
/**
 * like and tweets charts in co-operative
 */
class LT extends React.Component {
  updateDimensions() {
    console.log(this.width);
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const data = [
      {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
      },
      {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
      },
      {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
      },
      {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
      },
      {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
      },
      {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
      },
      {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
      }
    ]
    return (
      <BarChart width={500} height={100} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    );
  }
}

export default LT;
