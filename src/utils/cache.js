/**
 * LRU Cache implementation to optimize API requests and reduce RAM consumption.
 * It keeps track of the most recently used items and evicts the least recently used
 * when the limit is reached.
 */
export class LRUCache {
   constructor(limit = 50) {
      this.limit = limit;
      this.cache = new Map();
   }

   get(key) {
      if (!this.cache.has(key)) return null;
      
      const value = this.cache.get(key);
      
      // Check TTL (Time To Live)
      if (Date.now() - value.timestamp > value.ttl) {
         this.cache.delete(key);
         return null;
      }

      // Mark as recently used by moving it to the end
      this.cache.delete(key);
      this.cache.set(key, value);
      
      return value.data;
   }

   set(key, data, ttl = 5 * 60 * 1000) { // Default TTL: 5 minutes
      if (this.cache.has(key)) {
         this.cache.delete(key);
      } else if (this.cache.size >= this.limit) {
         // Evict the least recently used item (the first item in Map)
         const firstKey = this.cache.keys().next().value;
         this.cache.delete(firstKey);
      }
      this.cache.set(key, { data, timestamp: Date.now(), ttl });
   }

   has(key) {
      if (!this.cache.has(key)) return false;
      const value = this.cache.get(key);
      if (Date.now() - value.timestamp > value.ttl) {
         this.cache.delete(key);
         return false;
      }
      return true;
   }

   clear() {
      this.cache.clear();
   }
}

// Global API cache instance (limit to 100 API responses)
export const apiCache = new LRUCache(100);
