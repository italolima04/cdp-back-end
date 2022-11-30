import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  calcularPrecoPrazo,
  consultarCep,
  rastrearEncomendas,
} from 'correios-brasil';

@Injectable()
export class ShipmentService {
  async calculateShipment(zipCode: string) {
    const args = {
      sCepOrigem: '63901300',
      sCepDestino: zipCode,
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '27',
      nVlAltura: '5',
      nVlLargura: '20',
      nCdServico: ['04014'],
      nVlDiametro: '2700',
    };

    return calcularPrecoPrazo(args)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error) throw error;
        throw new HttpException(
          'Server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async consultZipCode(zipCode: string) {
    return;
    consultarCep(zipCode)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        if (error) throw error;
        throw new HttpException(
          'Server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async trackOrder(trackingCode: string) {
    return rastrearEncomendas([trackingCode])
      .then((response) => {
        return response[0].eventos.reverse();
      })
      .catch((error) => {
        if (error) throw error;
        throw new HttpException(
          'Server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
