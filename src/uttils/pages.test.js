import { getPagesCount, getPagesArray } from './pages';

describe('getPagesCount', () => {
    it('should return the correct number of pages', () => {
        expect(getPagesCount(10, 5)).toBe(2);
        expect(getPagesCount(8, 3)).toBe(3);
        expect(getPagesCount(1, 10)).toBe(1);
        expect(getPagesCount(0, 5)).toBe(0);
    });
});

describe('getPagesArray', () => {
    it('should return an array of page numbers from 1 to totalPages', () => {
        expect(getPagesArray(5)).toEqual([1, 2, 3, 4, 5]);
        expect(getPagesArray(3)).toEqual([1, 2, 3]);
        expect(getPagesArray(1)).toEqual([1]);
        expect(getPagesArray(0)).toEqual([]);
    });
});
