"use server";

import { db } from "~/server/db";

export async function ViewsToday({ userId }: { userId: string }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const viewsToday = await db.pageVisits.count({
    where: {
      userId,
      timestamp: {
        gte: today,
      },
    },
  });

  return viewsToday;
}

export async function ViewsYesterday({ userId }: { userId: string }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const viewsYesterday = await db.pageVisits.count({
    where: {
      userId,
      timestamp: {
        gte: yesterday,
        lt: today,
      },
    },
  });

  return viewsYesterday;
}

export async function PercentageChange({ userId }: { userId: string }) {
  const viewsToday = await ViewsToday({ userId });
  const viewsYesterday = await ViewsYesterday({ userId });

  const percentageChange =
    ((viewsToday - viewsYesterday) / viewsYesterday) * 100;

  return percentageChange.toFixed(0) + "%";
}

export async function LinkClicksToday({ userId }: { userId: string }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const linkClicksToday = await db.linkClicks.count({
    where: {
      userId,
      timestamp: {
        gte: today,
      },
    },
  });

  return linkClicksToday;
}

export async function LinkClicksYesterday({ userId }: { userId: string }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const linkClicksYesterday = await db.linkClicks.count({
    where: {
      userId,
      timestamp: {
        gte: yesterday,
        lt: today,
      },
    },
  });

  return linkClicksYesterday;
} 

export async function LinkClicksPercentageChange({
  userId,
}: {
  userId: string;
}) {
  const linkClicksToday = await LinkClicksToday({ userId });
  const linkClicksYesterday = await LinkClicksYesterday({ userId });

  const percentageChange =
    ((linkClicksToday - linkClicksYesterday) / linkClicksYesterday) * 100;

  return percentageChange.toFixed(0) + "%";
}

export async function TotalLinkClicks({ userId }: { userId: string }) {
  const linksOfUser = await db.links.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      url: true,
      _count: {
        select: { linkClicks: true },
      }
    },
  });

  return linksOfUser;
}

export async function ViewsThisMonth({ userId }: { userId: string }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(today);
  startOfMonth.setDate(1);

  const viewsThisMonth = await db.pageVisits.count({
    where: {
      userId,
      timestamp: {
        gte: startOfMonth,
      },
    },
  });

  return viewsThisMonth;
}

export async function ViewsPreviousMonth({ userId }: { userId: string }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(today);
  startOfMonth.setDate(1);

  const previousMonth = new Date(startOfMonth);
  previousMonth.setMonth(startOfMonth.getMonth() - 1);

  const viewsPreviousMonth = await db.pageVisits.count({
    where: {
      userId,
      timestamp: {
        gte: previousMonth,
        lt: startOfMonth,
      },
    },
  });

  return viewsPreviousMonth;
}

export async function TotalViews({ userId }: { userId: string }) {
  const totalViews = await db.pageVisits.count({
    where: {
      userId,
    },
  });

  return totalViews;
}

export async function AverageViews({ userId }: { userId: string }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(today);
  startOfMonth.setDate(1);

  const viewsThisMonth = await db.pageVisits.count({
    where: {
      userId,
      timestamp: {
        gte: startOfMonth,
      },
    },
  });

  const averageViews = viewsThisMonth / today.getDate();

  return averageViews.toFixed(2);
}

export async function ViewsByDayThisWeak({ userId }: { userId: string }) {
  const today = new Date();
  const tenDaysAgo = new Date(today);
  tenDaysAgo.setDate(today.getDate() - 10);

  const viewsByDayThisWeak = await db.pageVisits.findMany({
    where: {
      userId,
      timestamp: {
        gte: tenDaysAgo,
      },
    },
    select: {
      timestamp: true,
    },
  });

  type AggregatedData = {
    [key: string]: number;
  };

  // Process and aggregate the data
  const aggregatedData: AggregatedData = viewsByDayThisWeak.reduce((acc, curr) => {
    const date = new Date(curr.timestamp);
    const key = `${date.getDate()}/${date.getMonth() + 1}`;

    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += 1;

    return acc;
  }, {} as AggregatedData);

  // formate
  const formattedData = Object.keys(aggregatedData).map((key) => {
    return {
      date: key,
      views: aggregatedData[key],
    };
  });

  return formattedData;
}
