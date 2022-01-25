import {
  BarElement,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

// Displays the association score data type breakdown graph.
const AssociationGraph = (props) => {
  const { association_score } = props;
  console.log(association_score.datatypes);

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
        backgroundColor: "rgba(52, 137, 202, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Association Score vs. Data Type",
      },
    },
  };

  return (
    <tr>
      <td colSpan="4">
        <Bar options={options} data={data} />
      </td>
    </tr>
  );
};

export { AssociationGraph };
