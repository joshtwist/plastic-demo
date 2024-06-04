import {ZuploContext, ZuploRequest} from "@zuplo/runtime";

type MyPolicyOptionsType = {
  role: string;
};

export default async function policy(
  request: ZuploRequest,
  context: ZuploContext,
  options: MyPolicyOptionsType,
  policyName: string
) {
  // your policy code goes here, and can use the options to perform any
  // configuration
  // See the docs: https://www.zuplo.com/docs/policies/custom-code-inbound

  if (request.user.data.roles.includes(options.role)) {
    return request;
  }

  return new Response('Vineeth says no!', { status: 403});
}
