export const HttpMethods = {
	CONNECT: "CONNECT",
	DELETE: "DELETE",
	GET: "GET",
	HEAD: "HEAD",
	OPTIONS: "OPTIONS",
	PATCH: "PATCH",
	POST: "POST",
	PUT: "PUT",
	TRACE: "TRACE",
} as const;

export type HttpMethod = (typeof HttpMethods)[keyof typeof HttpMethods];
