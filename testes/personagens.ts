import { Request, Response } from 'express';
import PersonagensController from './personagens.controller';
import { PersonagensService } from './personagens.service';

// Mocking PersonagensService
jest.mock('./personagens.service');

describe('PersonagensController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return personagens', async () => {
      const mockPersonagens = [{ id: 1, nome: 'Personagem 1', funcao: 'Protagonista', url: 'http://example.com/personagem1' }];
      (PersonagensService.findAll as jest.Mock).mockResolvedValueOnce(mockPersonagens);

      await PersonagensController.findAll(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(mockPersonagens);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Test error');
      (PersonagensService.findAll as jest.Mock).mockRejectedValueOnce(mockError);

      await PersonagensController.findAll(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });

  describe('findById', () => {
    it('should return personagem by id', async () => {
      const mockPersonagem = { id: 1, nome: 'Personagem 1', funcao: 'Protagonista', url: 'http://example.com/personagem1' };
      req.params = { id: '1' };
      (PersonagensService.findById as jest.Mock).mockResolvedValueOnce(mockPersonagem);

      await PersonagensController.findById(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(mockPersonagem);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Test error');
      req.params = { id: '1' };
      (PersonagensService.findById as jest.Mock).mockRejectedValueOnce(mockError);

      await PersonagensController.findById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  })
});
