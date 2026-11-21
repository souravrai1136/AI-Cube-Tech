import { LiveClass, LiveClassStatus } from '../types';
import { liveClassesData } from '../data/liveClassesData';

const LIVE_CLASSES_STORAGE_KEY = 'aicubetech_live_classes_data_v4';

function getStoredLiveClasses(): LiveClass[] {
  try {
    localStorage.removeItem('learnora_live_classes_data');
    localStorage.removeItem('learnora_live_classes_data_inr');
    localStorage.removeItem('aicubetech_live_classes_data_v2');
    localStorage.removeItem('aicubetech_live_classes_data_v3');

    const stored = localStorage.getItem(LIVE_CLASSES_STORAGE_KEY);
    if (stored) {
      const parsed: LiveClass[] = JSON.parse(stored);
      if (parsed.length !== liveClassesData.length) {
        persistLiveClasses(liveClassesData);
        return liveClassesData;
      }
      return parsed;
    }
  } catch { }
  return liveClassesData;
}

function persistLiveClasses(classes: LiveClass[]): void {
  try {
    localStorage.setItem(LIVE_CLASSES_STORAGE_KEY, JSON.stringify(classes));
  } catch { }
}

export const liveClassService = {
  /**
   * Get all live classes with optional category & status filter
   */
  async getLiveClasses(statusFilter?: LiveClassStatus | 'all', category?: string): Promise<LiveClass[]> {
    let list = getStoredLiveClasses();

    if (statusFilter && statusFilter !== 'all') {
      list = list.filter((item) => item.status === statusFilter);
    }

    if (category && category !== 'All' && category !== 'all') {
      list = list.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }

    return list;
  },

  /**
   * Get single live class by ID
   */
  async getLiveClassById(id: string): Promise<LiveClass | null> {
    const list = getStoredLiveClasses();
    return list.find((c) => c.id === id) || null;
  },

  /**
   * Admin: Create a new live class
   */
  async createLiveClass(newClass: Omit<LiveClass, 'id'>): Promise<LiveClass> {
    const list = getStoredLiveClasses();
    const created: LiveClass = {
      ...newClass,
      id: `live-${Date.now()}`,
    };
    const updated = [created, ...list];
    persistLiveClasses(updated);
    return created;
  },

  /**
   * Admin: Update live class
   */
  async updateLiveClass(id: string, updates: Partial<LiveClass>): Promise<LiveClass | null> {
    const list = getStoredLiveClasses();
    const idx = list.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    list[idx] = { ...list[idx], ...updates };
    persistLiveClasses(list);
    return list[idx];
  },

  /**
   * Admin: Delete live class
   */
  async deleteLiveClass(id: string): Promise<boolean> {
    const list = getStoredLiveClasses();
    const filtered = list.filter((c) => c.id !== id);
    if (filtered.length === list.length) return false;
    persistLiveClasses(filtered);
    return true;
  },
};
