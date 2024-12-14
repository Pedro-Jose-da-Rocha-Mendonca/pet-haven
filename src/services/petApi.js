export const searchAdoptionCenters = async () => {
  try {
    const allCenters = [];
    let currentPage = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const endpoint = 'https://api.rescuegroups.org/v5/public/orgs/search';
      
      const payload = {
        data: {
          type: 'orgs',
          attributes: {
            limit: 250,
            page: currentPage,
            sort: {
              field: 'name',
              direction: 'asc'
            },
            fields: {
              orgs: [
                'name',
                'url',
                'email',
                'phone',
                'location',
                'address'
              ]
            }
          }
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': '8MrMVlcb'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText || response.statusText}`);
      }

      const rawText = await response.text();
      const data = JSON.parse(rawText);

      if (!data || !data.data) {
        throw new Error('Invalid API response format');
      }

      const transformedCenters = transformCenterData(data);
      allCenters.push(...transformedCenters);

      hasMorePages = data.meta && data.meta.totalPages > currentPage;
      currentPage++;

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return allCenters;
  } catch (error) {
    console.error('Detailed fetch error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
};

const transformCenterData = (data) => {
  if (!data.data || !Array.isArray(data.data)) return [];

  return data.data.map(org => ({
    id: org.id,
    name: org.attributes.name,
    location: {
      lat: parseFloat(org.attributes.lat || 0),
      lng: parseFloat(org.attributes.lon || 0)
    },
    email: org.attributes.email,
    phone: org.attributes.phone,
    website: org.attributes.url,
    address: {
      city: org.attributes.city,
      state: org.attributes.state,
      postalcode: org.attributes.postalcode,
      country: org.attributes.country
    },
    citystate: org.attributes.citystate
  }));
};

export const fetchContactSubmissions = async () => {
  try {
    const response = await fetch('/api/contacts');
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) throw new Error('Failed to submit form');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};