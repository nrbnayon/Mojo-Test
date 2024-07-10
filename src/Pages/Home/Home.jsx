import { useState } from "react";
import LoginButton from "./FacebookLogin";

const Home = () => {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [insights, setInsights] = useState(null);

  const handleLogin = (response) => {
    console.log(response);
    setUser(response);
    fetchPages(response.accessToken);
  };

  const fetchPages = (token) => {
    fetch(`https://graph.facebook.com/me/accounts?access_token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPages(data.data);
      });
  };

  const fetchPageInsights = (pageId, token) => {
    const since = "2023-01-01";
    const until = "2023-12-31";
    fetch(
      `https://graph.facebook.com/v20.0/${pageId}/insights?metric=page_fans,page_engaged_users,page_impressions,page_reactions&period=total_over_range&since=${since}&until=${until}&access_token=${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInsights(data.data);
      });
  };

  const handlePageChange = (e) => {
    const pageId = e.target.value;
    fetchPageInsights(pageId, user.accessToken);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {!user ? (
        <LoginButton onLogin={handleLogin} />
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
          <img
            src={user.picture.data.url}
            alt={user.name}
            className="rounded-full mx-auto mb-4"
          />
          <select
            onChange={handlePageChange}
            className="mb-4 p-2 border rounded"
          >
            {pages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.name}
              </option>
            ))}
          </select>
          {insights && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {insights.map((insight) => (
                <div key={insight.name} className="bg-white p-4 rounded shadow">
                  <h2 className="font-bold">{insight.title}</h2>
                  <p>{insight.values[0].value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
