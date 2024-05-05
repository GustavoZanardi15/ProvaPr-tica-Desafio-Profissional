import { Request, Response } from 'express';
import CriadoresController from './criadores.controller';
import { CriadoresService } from './criadores.service';

// Mocking CriadoresService
jest.mock('./criadores.service');

describe('CriadoresController', () => {
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
    it('should return criadores', async () => {
      const mockCriadores = [{ id: 1, nome: 'Criador 1', funcao: 'Autor', quadrinhos: 'Quadrinho 1' }];
      (CriadoresService.findAll as jest.Mock).mockResolvedValueOnce(mockCriadores);

      await CriadoresController.findAll(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(mockCriadores);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Test error');
      (CriadoresService.findAll as jest.Mock).mockRejectedValueOnce(mockError);

      await CriadoresController.findAll(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });

  describe('findById', () => {
    it('should return criador by id', async () => {
      const mockCriador = { id: 1, nome: 'Criador 1', funcao: 'Autor', quadrinhos: 'Quadrinho 1' };
      req.params = { id: '1' };
      (CriadoresService.findById as jest.Mock).mockResolvedValueOnce(mockCriador);

      await CriadoresController.findById(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(mockCriador);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Test error');
      req.params = { id: '1' };
      (CriadoresService.findById as jest.Mock).mockRejectedValueOnce(mockError);

      await CriadoresController.findById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Test error' });
    });
  });
});
