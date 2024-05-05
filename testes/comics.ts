import { Request, Response } from 'express';
import ComicsController from './comics.controller';
import { ComicsService } from './comics.service';

jest.mock('./comics.service');

describe('ComicsController', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return comics', async () => {
      const mockComics = [{ id: 1, title: 'Comic 1' }];
      (ComicsService.findAll as jest.Mock).mockResolvedValueOnce(mockComics);

      await ComicsController.findAll(req, res);

      expect(res.json).toHaveBeenCalledWith(mockComics);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Test error');
      (ComicsService.findAll as jest.Mock).mockRejectedValueOnce(mockError);

      await ComicsController.findAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });

  describe('findById', () => {
    it('should return comic by id', async () => {
      const mockComic = { id: 1, title: 'Comic 1' };
      req.params = { id: '1' };
      (ComicsService.findById as jest.Mock).mockResolvedValueOnce(mockComic);

      await ComicsController.findById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockComic);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Test error');
      req.params = { id: '1' };
      (ComicsService.findById as jest.Mock).mockRejectedValueOnce(mockError);

      await ComicsController.findById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });
});
