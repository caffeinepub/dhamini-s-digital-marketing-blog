import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type BlogPost = {
    id : Nat;
    title : Text;
    body : Text;
    excerpt : Text;
    author : Text;
    datePublished : Text;
    tags : [Text];
    category : Text;
  };

  // Storage
  let posts = Map.empty<Nat, BlogPost>();
  var nextId = 1;

  // Seed Data
  let seedPosts : [BlogPost] = [
    {
      id = 1;
      title = "On-Page SEO Basics";
      body = "On-page SEO involves optimizing individual web pages to rank higher in search engines. Key elements include keyword optimization, quality content, meta tags, and mobile-friendly design.";
      excerpt = "Learn fundamental on-page SEO strategies to boost organic traffic for your website.";
      author = "Dhamini Gowda";
      datePublished = "2025-01-15";
      tags = ["SEO", "On-Page", "Optimization"];
      category = "SEO";
    },
    {
      id = 2;
      title = "How to Do Keyword Research";
      body = "Keyword research helps identify the terms and phrases your target audience uses when searching online. Use tools like Google Keyword Planner to discover relevant keywords with strong search volume and reasonable competition.";
      excerpt = "Master keyword research for better digital marketing outcomes.";
      author = "Dhamini Gowda";
      datePublished = "2025-02-10";
      tags = ["SEO", "Keyword", "Research"];
      category = "Digital Marketing";
    },
    {
      id = 3;
      title = "Understanding Google Analytics";
      body = "Google Analytics is a powerful web analytics service that tracks and reports website traffic. Learn how to set up dashboards, interpret traffic sources, and optimize your marketing strategies based on insights gained.";
      excerpt = "Discover how to leverage Google Analytics for your marketing campaigns.";
      author = "Dhamini Gowda";
      datePublished = "2025-03-05";
      tags = ["Analytics", "Google", "Marketing"];
      category = "Analytics";
    },
  ];

  public shared ({ caller }) func initSeedData() : async () {
    if (nextId > 1) { Runtime.trap("Seed data already initialized") };
    seedPosts.forEach(func(post) { posts.add(post.id, post) });
    nextId += seedPosts.size();
  };

  public query ({ caller }) func getAllPosts() : async [BlogPost] {
    posts.values().toArray();
  };

  public query ({ caller }) func getPost(id : Nat) : async ?BlogPost {
    posts.get(id);
  };

  public shared ({ caller }) func createPost(
    title : Text,
    body : Text,
    excerpt : Text,
    author : Text,
    tags : [Text],
    category : Text,
  ) : async BlogPost {
    let post : BlogPost = {
      id = nextId;
      title;
      body;
      excerpt;
      author;
      datePublished = toDateString();
      tags;
      category;
    };

    posts.add(nextId, post);
    nextId += 1;
    post;
  };

  func toDateString() : Text {
    "2025-01-01";
  };
};
