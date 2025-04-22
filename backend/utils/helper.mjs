export const getTimeFilter = (timeRange) => {
    let timeFilter = {};
    if (timeRange) {
      const now = new Date();
      let fromDate;
      if (timeRange === "7days") {
        fromDate = new Date(now.setDate(now.getDate() - 7));
      } else if (timeRange === "month") {
        fromDate = new Date(now.setMonth(now.getMonth() - 1));
      } else if (timeRange === "year") {
        fromDate = new Date(now.setFullYear(now.getFullYear() - 1));
      }
      if (fromDate) {
        timeFilter = { createdAt: { $gte: fromDate } };
      }
    }
    return timeFilter;
  };