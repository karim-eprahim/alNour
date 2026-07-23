import { defineStore } from 'pinia';
import { ref } from 'vue';

async function fetchWorkersApi(params) {
  return $fetch("/api/workers", { params });
}
async function fetchWorkerApi(id) {
  return $fetch(`/api/workers/${id}`);
}
async function createWorkerApi(payload) {
  return $fetch("/api/workers", { method: "POST", body: payload });
}
async function updateWorkerApi(id, payload) {
  return $fetch(`/api/workers/${id}`, { method: "PATCH", body: payload });
}
async function deleteWorkerApi(id) {
  await $fetch(`/api/workers/${id}`, { method: "DELETE" });
}
async function logAttendanceApi(payload) {
  return $fetch("/api/workers/attendance", { method: "POST", body: payload });
}
async function fetchAttendanceApi(params) {
  return $fetch("/api/workers/attendance", { params });
}
async function createAdvanceApi(payload) {
  return $fetch("/api/workers/advances", { method: "POST", body: payload });
}
async function fetchAdvancesApi(params) {
  return $fetch("/api/workers/advances", { params });
}
async function logDailyWagesApi(payload) {
  return $fetch("/api/workers/daily-wages", { method: "POST", body: payload });
}
async function fetchDailyWagesApi(params) {
  return $fetch("/api/workers/daily-wages", { params });
}
async function fetchWorkerReportApi(id, params) {
  return $fetch(`/api/workers/report/${id}`, { params });
}
async function fetchWorkersLookupApi(params) {
  return $fetch("/api/workers/lookup", { params });
}
const useWorkersStore = defineStore("workers", () => {
  const workers = ref([]);
  const currentWorker = ref(null);
  const loading = ref(false);
  const total = ref(0);
  const attendanceRecords = ref([]);
  const attendanceTotal = ref(0);
  const advances = ref([]);
  const advancesTotal = ref(0);
  const dailyWages = ref([]);
  const dailyWagesTotal = ref(0);
  const workerReport = ref(null);
  async function fetchWorkers(params) {
    loading.value = true;
    try {
      const data = await fetchWorkersApi(params);
      workers.value = data.workers;
      total.value = data.total;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function fetchWorker(id) {
    loading.value = true;
    try {
      const data = await fetchWorkerApi(id);
      currentWorker.value = data.worker;
      return data.worker;
    } finally {
      loading.value = false;
    }
  }
  async function createWorker(payload) {
    loading.value = true;
    try {
      const data = await createWorkerApi(payload);
      workers.value.unshift(data.worker);
      return data.worker;
    } finally {
      loading.value = false;
    }
  }
  async function updateWorker(id, payload) {
    loading.value = true;
    try {
      const data = await updateWorkerApi(id, payload);
      const idx = workers.value.findIndex((w) => w.id === id);
      if (idx !== -1) workers.value[idx] = data.worker;
      if (currentWorker.value?.id === id) currentWorker.value = data.worker;
      return data.worker;
    } finally {
      loading.value = false;
    }
  }
  async function deleteWorker(id) {
    loading.value = true;
    try {
      await deleteWorkerApi(id);
      workers.value = workers.value.filter((w) => w.id !== id);
      if (currentWorker.value?.id === id) currentWorker.value = null;
    } finally {
      loading.value = false;
    }
  }
  async function logAttendance(payload) {
    loading.value = true;
    try {
      return await logAttendanceApi(payload);
    } finally {
      loading.value = false;
    }
  }
  async function fetchAttendance(params) {
    loading.value = true;
    try {
      const data = await fetchAttendanceApi(params);
      attendanceRecords.value = data.attendance;
      attendanceTotal.value = data.total;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function createAdvance(payload) {
    loading.value = true;
    try {
      const data = await createAdvanceApi(payload);
      advances.value.unshift(data.advance);
      return data.advance;
    } finally {
      loading.value = false;
    }
  }
  async function fetchAdvances(params) {
    loading.value = true;
    try {
      const data = await fetchAdvancesApi(params);
      advances.value = data.advances;
      advancesTotal.value = data.total;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function logDailyWages(payload) {
    loading.value = true;
    try {
      return await logDailyWagesApi(payload);
    } finally {
      loading.value = false;
    }
  }
  async function fetchDailyWages(params) {
    loading.value = true;
    try {
      const data = await fetchDailyWagesApi(params);
      dailyWages.value = data.dailyWages;
      dailyWagesTotal.value = data.total;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function fetchReport(id, params) {
    loading.value = true;
    try {
      const data = await fetchWorkerReportApi(id, params);
      workerReport.value = data.report;
      return data.report;
    } finally {
      loading.value = false;
    }
  }
  function clearCurrent() {
    currentWorker.value = null;
    workerReport.value = null;
  }
  return {
    workers,
    currentWorker,
    loading,
    total,
    attendanceRecords,
    attendanceTotal,
    advances,
    advancesTotal,
    dailyWages,
    dailyWagesTotal,
    workerReport,
    fetchWorkers,
    fetchWorker,
    createWorker,
    updateWorker,
    deleteWorker,
    logAttendance,
    fetchAttendance,
    createAdvance,
    fetchAdvances,
    logDailyWages,
    fetchDailyWages,
    fetchReport,
    clearCurrent
  };
});

export { fetchWorkersLookupApi as f, useWorkersStore as u };
//# sourceMappingURL=store-CbGTzEpA.mjs.map
