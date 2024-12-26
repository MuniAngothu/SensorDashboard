// dataUtils.js
export const prepareChartData = (feeds, fieldKey) => {
    return {
      labels: feeds.map((entry) =>
        new Date(entry.created_at).toLocaleTimeString()
      ), // Extract time
      values: feeds.map((entry) => parseFloat(entry[fieldKey])), // Extract sensor values
    };
  };
  