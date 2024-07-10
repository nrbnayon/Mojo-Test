import { useState, useEffect } from "react";
import LoginButton from "./LoginButton";

const Home = () => {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    // Ensure these functions are accessible globally
    window.checkLoginState = function () {
      FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
      });
    };

    window.statusChangeCallback = function (response) {
      if (response.status === "connected") {
        // Logged into your app and Facebook.
        fetchUserProfile(response.authResponse);
      } else {
        // Not logged in or not authorized.
        setUser(null);
        setPages([]);
        setInsights(null);
      }
    };

    // Load Facebook SDK when component mounts
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.onload = () => {
      FB.init({
        appId: "904086431755202", // Replace with your app ID
        cookie: true,
        xfbml: true,
        version: "v20.0", // Use the latest API version
      });
      FB.AppEvents.logPageView();
    };
    document.body.appendChild(script);
  }, []);

  const fetchUserProfile = (authResponse) => {
    FB.api("/me", { fields: "name,picture" }, function (response) {
      setUser({ ...response, accessToken: authResponse.accessToken });
      fetchPages(authResponse.accessToken);
    });
  };

  const fetchPages = (token) => {
    fetch(`https://graph.facebook.com/me/accounts?access_token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching pages:", data.error);
        } else {
          setPages(data.data);
        }
      })
      .catch((error) => {
        console.error("Fetch Pages Error:", error);
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
        if (data.error) {
          console.error("Error fetching page insights:", data.error);
        } else {
          setInsights(data.data);
        }
      })
      .catch((error) => {
        console.error("Fetch Page Insights Error:", error);
      });
  };

  const handlePageChange = (e) => {
    const pageId = "61561879127280"; // Fixed Page ID
    fetchPageInsights(pageId, user.accessToken);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {!user ? (
        <LoginButton onLogin={checkLoginState} />
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
