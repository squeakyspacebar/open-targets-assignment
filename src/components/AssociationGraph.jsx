import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import {
  ArcElement,
  BarElement,
  Chart as ChartJS,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, PolarArea, Radar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip
);

// Displays the association score data type breakdown graph.
const AssociationGraph = (props) => {
  const { association_score } = props;
  const [tabKey, setTabKey] = useState("bar");

  const labels = [];
  const dataset = [];
  for (const [key, value] of Object.entries(association_score.datatypes)) {
    labels.push(key);
    dataset.push(value);
  }

  const data = {
    labels,
    datasets: [
      {
        data: dataset,
        backgroundColor:
          tabKey === "polarArea"
            ? [
                "rgba(114, 24, 23, 0.8)",
                "rgba(247, 146, 86, 0.8)",
                "rgba(225, 206, 122, 0.8)",
                "rgba(91, 140, 90, 0.8)",
                "rgba(56, 78, 119, 0.8)",
                "rgba(167, 153, 183, 0.8)",
                "rgba(13, 6, 48, 0.8)",
              ]
            : ["rgba(52, 137, 202, 0.5)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    animation: {
      duration: 0,
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Association Score vs. Data Type",
      },
    },
  };

  if (tabKey === "polarArea") {
    options.plugins.legend = {
      display: true,
    };
  } else {
    options.plugins.legend = {
      display: false,
    };
  }

  return (
    <tr>
      <td colSpan="4">
        <Tabs
          activeKey={tabKey}
          onSelect={(k) => {
            setTabKey(k);
          }}
        >
          <Tab eventKey="bar" title="Bar">
            <div className="association-score-graph">
              <Bar options={options} data={data} />
            </div>
          </Tab>
          <Tab eventKey="polarArea" title="Polar Area">
            <div className="association-score-graph">
              <PolarArea options={options} data={data} />
            </div>
          </Tab>
          <Tab eventKey="radar" title="Radar">
            <div className="association-score-graph">
              <Radar options={options} data={data} />
            </div>
          </Tab>
        </Tabs>
      </td>
    </tr>
  );
};

export { AssociationGraph };
