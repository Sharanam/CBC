const statuses = [
  "under maintenance",
  "running on time",
  "running late",
  "cancelled",
];

export default statuses;

export function colorOf(status) {
  const con = {
    "under maintenance": "warning",
    "running on time": "correct",
    "running late": "info",
    cancelled: "warning",
  };
  return con[status] || "warning";
}
