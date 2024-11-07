import { StatusCodes } from 'http-status-codes';
import { Mediator } from '@westfield-rise/westfield-rise-backend-utils';
import {
  CREATE_CONTACT_COMMAND,
  CREATE_DOUBLE_OPT_IN_CONTACT_COMMAND,
} from '@westfield-rise/westfield-rise-backend-utils'; // import the constant

export const createContact = async (req, res) => {
  const commandData = req.body;

  // Checking if command data is null or undefined
  if (!commandData) {
    return res.status(StatusCodes.BAD_REQUEST).send();
  }

  // Here we create a command object with a type and data
  const command = {
    type: CREATE_CONTACT_COMMAND,
    data: commandData,
  };

  // Call the extracted function
  return executeCommand(command, res);
};

export const createDubleOptInContact = async (req, res) => {
  const commandData = req.body;

  // Checking if command data is null or undefined
  if (!commandData) {
    return res.status(StatusCodes.BAD_REQUEST).send();
  }

  // Here we create a command object with a type and data
  const command = {
    type: CREATE_DOUBLE_OPT_IN_CONTACT_COMMAND,
    data: commandData,
  };

  // Call the extracted function
  return await executeCommand(command, res);
};

// If a result is not null, it returns a 201 status with no content
// If there is an error, it returns a 500 status
async function executeCommand(command, res) {
  try {
    const result = await Mediator.send(command);
    if (result !== null) {
      return res.status(StatusCodes.CREATED).send();
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  } catch (err) {
    console.error(err);
    if (
      err.response &&
      err.response._body &&
      err.response._body.code === 'duplicate_parameter'
    )
      return res.status(StatusCodes.CONFLICT).send();
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}
