import { v4 as uuid } from 'uuid';

const Mutation = {
  /**
   * Purchase operation. Decreases account balance and increases revenue
   */
  purchase(): {recordId: string; record: any} {
    const id = uuid();

    return {
      recordId: id,
      record: {
        id,
        description: 'Mocked purchase',
        dtCreated: new Date(),
        type: 'Purchase',
      },
    };
  },
};

export default {
  Mutation,
};
