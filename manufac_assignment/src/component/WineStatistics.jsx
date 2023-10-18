import React, { useState } from 'react';
import dataa from '../data.json';

function WineStatistics() {
  // State to store the data from dataa
  const [data, setData] = useState(dataa);

  // Function to calculate statistics
  const calculateStatistics = () => {
    // Get unique classes from the data
    const classes = [...new Set(data.map(item => item.Alcohol))];
    // console.log(classes)
    // Object to store statistics
    const statistics = {};

    // Loop through each class
    for (const className of classes) {
      const classData = data.filter(item => item.Alcohol === className);
      // console.log(classData)

      // Calculate statistics for Flavanoids
      const flavanoids = classData.map(item => item.Flavanoids);
      const mean = (flavanoids.reduce((acc, value) => parseInt(acc) + parseInt(value), 0) / flavanoids.length).toFixed(3);
      // console.log(mean)
      const sortedFlavanoids = [...flavanoids].sort((a, b) => a - b);
      const median = ((sortedFlavanoids[Math.floor(flavanoids.length / 2)] + sortedFlavanoids[Math.ceil(flavanoids.length / 2)]) / 2).toFixed(3);

      const counts = {};
      let mode = null;
      let modeCount = 0;
      for (const value of flavanoids) {
        counts[value] = (counts[value] || 0) + 1;
        if (counts[value] > modeCount) {
          mode = value;
          modeCount = counts[value];
        }
      }

      // Calculate statistics for Gamma
      const gammaValues = classData.map(item => (item.Ash * item.Hue) / item.Magnesium);
      const gammaMean = (gammaValues.reduce((acc, value) => acc + value, 0) / gammaValues.length).toFixed(3);

      // console.log(gammaMean)
      const sortedGammaValues = [...gammaValues].sort((a, b) => a - b);
      const gammaMedian = ((sortedGammaValues[Math.floor(gammaValues.length / 2)] + sortedGammaValues[Math.ceil(gammaValues.length / 2)]) / 2).toFixed(3);

      const gammaCounts = {};
      let gammaMode = null;
      let gammaModeCount = 0;
      for (const value of gammaValues) {
        gammaCounts[value] = (gammaCounts[value] || 0) + 1;
        if (gammaCounts[value] > gammaModeCount) {
          gammaMode = value;
          gammaModeCount = gammaCounts[value];
        }
      }

      // Store the statistics in the object
      statistics[className] = {
        Flavanoids: {
          Mean: mean,
          Median: median,
          Mode: mode.toFixed(3),
        },
        Gamma: {
          Mean: gammaMean,
          Median: gammaMedian,
          Mode: gammaMode.toFixed(3),
        },
      };
    }

    return statistics;
  };

  // Calculate statistics
  const statistics = calculateStatistics();

  // Get the unique class names
  const classes = Object.keys(statistics);

  return (
    <div>
      {/* Flavanoids Table */}
      <h2>Flavonoids Table</h2>
      <table className="wine-table">
        <thead>
          <tr>
            <th>Measure</th>
            {classes.map(className => <th key={className}>Class {className}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Flavanoids Mean</th>
            {classes.map(className => (
              <td key={className}>
                {statistics[className].Flavanoids.Mean}
              </td>
            ))}
          </tr>
          <tr>
            <th>Flavanoids Median</th>
            {classes.map(className => (
              <td key={className}>
                {statistics[className].Flavanoids.Median}
              </td>
            ))}
          </tr>
          <tr>
            <th>Flavanoids Mode</th>
            {classes.map(className => (
              <td key={className}>
                {statistics[className].Flavanoids.Mode}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Gamma Table */}
      <h2>Gamma Table</h2>
      <table className="wine-table">
        <thead>
          <tr>
            <th>Measure</th>
            {classes.map(className => <th key={className}>Class {className}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Gamma Mean</th>
            {classes.map(className => (
              <td key={className}>
                {statistics[className].Gamma.Mean}
              </td>
            ))}
          </tr>
          <tr>
            <th>Gamma Median</th>
            {classes.map(className => (
              <td key={className}>
                {statistics[className].Gamma.Median}
              </td>
            ))}
          </tr>
          <tr>
            <th>Gamma Mode</th>
            {classes.map(className => (
              <td key={className}>
                {statistics[className].Gamma.Mode}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WineStatistics;
