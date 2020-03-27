import FetchHelper from '../helper/fetchHelper';
import config from '../config/config';

const PostService = {};
const baseURL = `https://api.github.com/repos/${config.github_owner}/${config.github_repo}`;
const fetchHelper = new FetchHelper(baseURL);

PostService.create = async ({ content, message, path }) => {
  try {
    const res = await fetchHelper.put(`/contents/${path}`, { message, content }, { Authorization: `bearer ${config.github_token}` });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

PostService.update = async ({
  sha, content, message, path,
}) => {
  try {
    const res = await fetchHelper.put(`/contents/${path}`, { message, content, sha }, { Authorization: `bearer ${config.github_token}` });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

PostService.delete = async ({ sha, message, path }) => {
  try {
    const res = await fetchHelper.delete(`/contents/${path}`, { message, sha }, { Authorization: `bearer ${config.github_token}` });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export default PostService;
