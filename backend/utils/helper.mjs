export const getTimeFilter = (timeRange) => {
    let timeFilter = {};
    if (timeRange) {
      const now = new Date();
      let fromDate;
      if (timeRange === "24hours") {
        fromDate = new Date(now.setHours(now.getHours() - 24));
      } else if (timeRange === "3days") {
        fromDate = new Date(now.setDate(now.getDate() - 3));
      } else if (timeRange === "7days") {
        fromDate = new Date(now.setDate(now.getDate() - 7));
      } else if (timeRange === "2weeks") {
        fromDate = new Date(now.setDate(now.getDate() - 14));
      } else if (timeRange === "month") {
        fromDate = new Date(now.setMonth(now.getMonth() - 1));
      } else if (timeRange === "3months") {
        fromDate = new Date(now.setMonth(now.getMonth() - 3));
      } else if (timeRange === "6months") {
        fromDate = new Date(now.setMonth(now.getMonth() - 6));
      } else if (timeRange === "year") {
        fromDate = new Date(now.setFullYear(now.getFullYear() - 1));
      } else if (timeRange === "2years") {
        fromDate = new Date(now.setFullYear(now.getFullYear() - 2));
      }
      if (fromDate) {
        timeFilter = { createdAt: { $gte: fromDate } };
      }
    }
    return timeFilter;
  };
export const getPaginationParams = (query) => {
    const page = parseInt(query.page) > 0 ? parseInt(query.page) : 1;
    const limit = parseInt(query.limit) > 0 ? parseInt(query.limit) : 10;
    const skip = (page - 1) * limit;
    return { page, limit, skip };
  };