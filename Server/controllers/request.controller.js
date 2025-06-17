import httpStatus from 'http-status';
import ApiError from '../utils/api-error.js';
import { createAdvisorRequestService, getAdvisorRequestsService, decideRequestService, getRequestFileService } from '../services/request.service.js';

export const createAdvisorRequest = async (req, res) => {
  try {
    const studentId = req.user.id;
    const advisorId = req.body.advisorId;
    const file = req.file;

    const newRequest = await createAdvisorRequestService(studentId, advisorId, file);
    res.status(201).json({ message: 'Request sent successfully.', request: newRequest });
  } catch (error) {
    console.error('Create Advisor Request Error:', error);
    res.status(error.statusCode || 500).json({ message: error.message || 'Server error.' });
  }
};

export const advisorGetRequestsController = async (req, res, next) => {
  try {
    const advisorId  = req.user.id;

    if (!advisorId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Advisor ID is required.');
    }

    const requests = await getAdvisorRequestsService(advisorId);
    res.status(httpStatus.OK).json({ requests });
  } catch (err) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};
export const getRequestFileController = async (req, res) => {
  try {
    const { file, fileName, contentType } = await getRequestFileService(req.params.requestId);

    res.set({
      'Content-Type': contentType,
      'Content-Disposition': `inline; filename="${fileName}"`, // change to attachment if download is preferred
    });

    res.send(file);
  } catch (error) {
    console.error('File Download Error:', error);
    res.status(error.statusCode || 500).json({ success: false, message: error.message || 'Internal Server Error' });
  }
};

export const decideAdvisorRequestController = async (req, res, next) => {
  try {
    const { requestId  } = req.params;
    const { status, feedback } = req.body;
    console.log("id:", requestId, "status:", status, "feedback:", feedback);

    if (!["Approved", "Rejected"].includes(status)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid status value");
    }

    const request = await decideRequestService({ requestId, decision: status, feedback });

    res.status(200).json({ message: "Request updated successfully", request });
  } catch (error) {
    console.error("Decide Request Error:", error);
    next(new ApiError(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
};