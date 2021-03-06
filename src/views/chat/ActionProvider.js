import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleEnvironment = () => {
    const message = this.createChatBotMessage('What environment?', {
      widget: 'todos',
    });
    this.addMessageToBotState(message);
  };

  handleProblem = () => {
    const message = this.createChatBotMessage('What`s the problem?', {
      withAvatar: true,
    });
    this.addMessageToBotState(message);
  };

  handleAnswerEnvironment = (val) => {
    const message = this.createClientMessage(val, {
      withAvatar: true,
    });
    this.addMessageToBotState(message);
    const message1 = this.createChatBotMessage(`What's the problem?`, {
      withAvatar: true,
    });
    this.addMessageToBotState(message1);
    axios
      .post(
        'https://techoryze-node-deploy.herokuapp.com/conversation/update_conversation',
        {
          key: 'environment',
          value: val,
        }
      )
      .then((json) => {
        console.log('success', json.data);
      })
      .catch((error) => {
        console.log('errror', error);
      });
  };

  handleWorries = () => {
    const message = this.createChatBotMessage(
      `No worries. Connecting you to an expert...`,
      {
        withAvatar: true,
      }
    );
    this.addMessageToBotState(message);
    axios
      .get(
        'https://techoryze-node-deploy.herokuapp.com/conversation/get_conversation'
      )
      .then((json) => {
        const message1 = this.createChatBotMessage(
          `You are connected to ${json.data.data[0].expert}`,
          {
            withAvatar: true,
          }
        );
        this.addMessageToBotState(message1);
      })
      .catch((error) => {
        console.log('errror', error);
      });
  };

  addMessageToBotState = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages],
      }));
    }
  };
}

export default ActionProvider;
