/****************************************************************
 *                      Write api URLs here.                    *
 *        You can add more environments with similar syntax     *
 ****************************************************************/

export const config: any = {
  service: {
    // @if ENV='prod'
    api: 'http://prod/api',
    auth: 'http://prod/api',
    // @endif

    // @if ENV='dev'
    api: 'http://localhost:8000/api',
    auth: 'http://localhost:8000/api',
    // @endif
  }
};
