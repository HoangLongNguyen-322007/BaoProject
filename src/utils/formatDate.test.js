import { formatDate, formatTime, getTimeAgo } from '../utils/formatDate';

describe('formatDate', () => {
   test('formats date correctly', () => {
      const date = new Date('2026-05-30');
      const result = formatDate(date);
      expect(result).toBe('May 30, 2026');
   });

   test('handles string date input', () => {
      const result = formatDate('2026-05-30');
      expect(result).toContain('2026');
   });
});

describe('formatTime', () => {
   test('formats time correctly', () => {
      const date = new Date('2026-05-30T14:30:00');
      const result = formatTime(date);
      expect(result).toMatch(/\d{1,2}:\d{2}\s(AM|PM)/);
   });
});

describe('getTimeAgo', () => {
   test('returns "Just now" for recent dates', () => {
      const now = new Date();
      const result = getTimeAgo(now);
      expect(result).toBe('Just now');
   });

   test('returns minutes ago for dates within an hour', () => {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      const result = getTimeAgo(tenMinutesAgo);
      expect(result).toMatch(/\d+m ago/);
   });

   test('returns hours ago for dates within a day', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      const result = getTimeAgo(twoHoursAgo);
      expect(result).toMatch(/\d+h ago/);
   });

   test('returns days ago for older dates', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      const result = getTimeAgo(threeDaysAgo);
      expect(result).toMatch(/\d+d ago/);
   });
});
