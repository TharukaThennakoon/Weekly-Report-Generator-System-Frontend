// components/dashboard/ActivityFeed.tsx

import { IconFileCheck, IconFilePencil } from "@tabler/icons-react";

type ActivityItem = {
  id: string;
  userName: string;
  action: string;
  timestamp: string;
};

interface ActivityFeedProps {
  activity?: ActivityItem[];
}

export function ActivityFeed({
  activity = [],
}: ActivityFeedProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        Recent activity
      </h3>

      {activity.length === 0 ? (
        <p className="text-sm text-gray-400">No recent activity.</p>
      ) : (
        <ul className="space-y-3">
          {activity.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 text-sm"
            >
              {item.action.toLowerCase().includes("submitted") ? (
                <IconFileCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-green-600"
                />
              ) : (
                <IconFilePencil
                  size={16}
                  className="mt-0.5 shrink-0 text-amber-600"
                />
              )}

              <div>
                <span className="font-medium text-gray-900">
                  {item.userName}
                </span>{" "}
                <span className="text-gray-600">
                  {item.action}
                </span>

                <div className="mt-0.5 text-xs text-gray-400">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}