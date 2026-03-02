/**
 * Enhanced HTTP Response class with convenient static methods for common scenarios
 *
 * A lightweight wrapper around the native Response class that provides
 * standardized methods for API responses, error handling, and redirects.
 *
 * @example
 * // JSON responses
 * return HttpResponse.json({ data: user });
 * return HttpResponse.success(user, 'User found');
 *
 * // Error responses
 * return HttpResponse.notFound('User not found');
 * return HttpResponse.serverError('DATABASE_ERROR', 'Unable to connect');
 *
 * // Status-specific responses
 * return HttpResponse.created(newUser, 'User created successfully');
 * return HttpResponse.noContent();
 *
 * // Redirects
 * return HttpResponse.redirect('/login');
 */
export class HttpResponse extends Response {
  /**
   * Create a 201 Created response
   * @param body - The created resource data
   * @param message - Success message
   * @param init - Additional response options
   * @returns HttpResponse with 201 status
   */
  static created(
    body: any,
    message = 'Resource created',
    init: ResponseInit = {},
  ) {
    return this.json(
      { body, message, success: true, timestamp: new Date().toISOString() },
      { ...init, status: init.status ?? 201 },
    );
  }

  /**
   * Create a 400 Bad Request error response
   * @param error - Machine-readable error code
   * @param message - Human readable error message
   * @param init - Additional response options
   * @returns HttpResponse with error format
   */
  static error(
    error?: string,
    message?: string,
    init: ResponseInit = {},
  ): HttpResponse {
    return this.json(
      {
        error,
        message,
        success: false,
        timestamp: new Date().toISOString(),
      },
      { ...init, status: init.status ?? 400 },
    );
  }

  /**
   * Create a 403 Forbidden response
   * @param message - Human readable error message
   * @param init - Additional response options
   * @returns HttpResponse with 403 status
   */
  static forbidden(message = 'Forbidden', init: ResponseInit = {}) {
    return this.error('FORBIDDEN', message, {
      ...init,
      status: init.status ?? 403,
    });
  }

  /**
   * Create a JSON response with proper Content-Type header
   * @param body - The data to send as JSON
   * @param init - Standard ResponseInit options
   * @returns HttpResponse with JSON content
   */
  static json(body: any, init: ResponseInit = {}): HttpResponse {
    const headers = new Headers(init.headers);
    headers.set('Content-Type', 'application/json');
    return new HttpResponse(JSON.stringify(body), {
      ...init,
      headers,
    });
  }

  /**
   * Create a 204 No Content response
   * @param init - Additional response options
   * @returns HttpResponse with 204 status and null body
   */
  static noContent(init: ResponseInit = {}) {
    return new HttpResponse(null, { ...init, status: init.status ?? 204 });
  }

  /**
   * Create a 404 Not Found response
   * @param message - Human readable error message
   * @param init - Additional response options
   * @returns HttpResponse with 404 status
   */
  static notFound(message = 'Not Found', init: ResponseInit = {}) {
    return this.error('NOT_FOUND', message, {
      ...init,
      status: init.status ?? 404,
    });
  }

  /**
   * Create a redirect response
   * @param url - URL to redirect to
   * @param status - HTTP status code for redirect (default: 302)
   * @returns HttpResponse with Location header and redirect status
   */
  static redirect(url: string | URL, status = 302): HttpResponse {
    const headers = new Headers();
    headers.set('Location', url.toString());

    return new HttpResponse(null, { headers, status });
  }

  /**
   * Create a 500 Internal Server Error response
   * @param error - Machine-readable error code
   * @param message - Human readable error message
   * @param init - Additional response options
   * @returns HttpResponse with 500 status
   */
  static serverError(
    error?: string,
    message = 'Internal Server Error',
    init: ResponseInit = {},
  ) {
    return this.error(error ?? 'INTERNAL_ERROR', message, {
      ...init,
      status: init.status ?? 500,
    });
  }

  /**
   * Create a successful 200 OK response
   * @param body - Response data payload
   * @param message - Optional success message
   * @param init - Additional response options
   * @returns HttpResponse with 200 status and success format
   */
  static success(
    body: any,
    message?: string,
    init: ResponseInit = {},
  ): HttpResponse {
    return this.json(
      {
        body,
        message,
        success: true,
        timestamp: new Date().toISOString(),
      },
      { ...init, status: init.status ?? 200 },
    );
  }

  /**
   * Create a 401 Unauthorized response
   * @param message - Human readable error message
   * @param init - Additional response options
   * @returns HttpResponse with 401 status
   */
  static unauthorized(message = 'Unauthorized', init: ResponseInit = {}) {
    return this.error('UNAUTHORIZED', message, {
      ...init,
      status: init.status ?? 401,
    });
  }
}
