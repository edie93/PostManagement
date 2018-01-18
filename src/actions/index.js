import axios from "axios";
export const FETCH_POSTS = "fetch_posts";
export const FETCH_POST = "fetch_post";
export const DELETE_POST = "delete_post";
export const CREATE_POST = "create_post";
export const SEARCH_POSTS = "search_posts";
export const UPDATE_POST = "update_post";

//Hardcode posts
const source = {
  posts: {
    0: {
      id: 0,
      title: "HOW TO PACK CARRY ON BAG FOR EVERY TRIP!",
      categories: "Travel",
      headingImg: "../img/travel.png",
      content:
        "Welcome to my guide to Packing the Perfect Carry On for any flight – it’s my ultimate guide to packing a TSA approved sized bag which will get you to where you are going with everything you’ll need. With more and more airlines charging you to stow a bag in the hold, it has never been more important to learn how to pack the perfect carry on bag – and in doing so it not only saves you a little extra cash, but it also helps get you on your way at your destination as you step off the plane as you don’t need stand at the carousel to collect your bag. Winning! Scroll down for the perfect carry on packing list and we’ll have you packing like a pro in no time!(https://maketimetoseetheworld.com/what-to-pack-in-your-carry-on-in-flight-essentials/)",
      publishedAt: "Jan 16, 2018",
      publishedBy: "Vicki"
    },
    1: {
      id: 1,
      title: "EVERYTHING YOU NEED TO KNOW ABOUT DEADPOOL2!",
      categories: "Movie",
      headingImg: "../img/movie.png",
      content:
        "Bucking the trend of superhero blockbusters in more ways than one, 2016’s Deadpool shot to unexpected success after being made on a reported budget of $58 million – a fraction of everyday global smashes. NME’s review called it a “stylishly salty antidote to bloated recent superhero movies,” and it became one of the year’s biggest hits.How do you follow-up a low-budget smash with ten times the expectation, especially when the original took 11 years to complete? Work is already underway on a follow-up – and here’s everything you need to know about Deadpool 2’s story, cast and release date. Anyone unfamiliar with Deadpool’s plot, do not read on  – it’s spoilers o’clock down there.(http://www.nme.com/blogs/deadpool-2-release-date-cast-trailers-everything-you-need-to-know-2005234)",
      publishedAt: "Jan 16, 2018",
      publishedBy: "Jamie Milton"
    },
    2: {
      id: 2,
      title: "HOME FOR THE HARVEST",
      categories: "Food",
      headingImg: "../img/food.png",
      content:
        "In the early 1900s, my paternal grandfather, Maroun Kassab, planted close to 200 olive saplings in the southern Lebanese village of Ain el Delb, just east of the biblical city of Sidon. His home sat among the young trees, and every day he would wake up before dawn and carry buckets of water from his well, tending to them one by one. This backbreaking work lasted years before the roots were strong enough to sustain the plants. From then on, the trees depended on Baal, the ancient deity of fertility, rain, and dew once worshipped by the region's indigenous inhabitants, the Canaanites. But although the trees were watered by the heavens, Jiddi, or Grandfather, still pampered them, trimming off the dead wood, pulling out weeds, and nurturing the soil.(https://www.saveur.com/article/travels/lebanon-olive-harvest)",
      publishedAt: "Jan 18, 2018",
      publishedBy: "Fouad Kassab"
    },
    3: {
      id: 3,
      title: "COOL PARTY - LIGHTS OUT",
      categories: "Music",
      headingImg: "../img/music.png",
      content:
        "Does Nick Acquroff have solid gold pipes? Does Liv Gavranich have solid gold pipes? Would solid gold pipes actually be of any auditory value? Wow, those are some good questions, maybe let’s write some of them down and come back to them later because right now it’s alistening time. Picture yourself two separate circles. Those two circles as the voices of Liv and Nick, the two souls who constitute the newly formed Cool Party. Now put those two circles directly over each other. Looks like one circle now, huh? That’s the ven diagram of their overlapping voices. And while that made a whole lot of sense in my head but literally none on paper, their voices entwined make sense in every which format (but particularly mp3). Liv has the hushed intimacy of a candlelit conversation while Nick’s is wrapped in bold warmth of your grandfather’s firmest hug.(http://sounddoc.net/)",
      publishedAt: "Jan 13, 2018",
      publishedBy: "Tommy"
    },
    4: {
      id: 4,
      title: "TARO CHIPS WITH DIJON MUSTARD RECIPE",
      categories: "Food",
      headingImg: "../img/food.png",
      content:
        "I fry most things with coconut oil because I am a fan of saturated fats. If coconut oil is not available, I would suggest frying the taro with duck or goose fat, ghee, lard or tallow. Heat your fat of choice to 160c and add the slices in batches that suit the amount of fat you have available. Fry until the taro turns golden (approx 4 minutes). Sprinkle the chips with salt and dip them into a good quality dijon that has a bit of heat to it. This is awesome stuff – filling and delicious – so be careful as you might get addicted (not that there’s anything wrong with that). In Sydney, you can find taro at any  Asian or Italian green grocer and should cost you just a bit more than your average potato. Try it and let me know how you like it!(http://thefoodblog.com.au/2013/05/taro-chips-with-dijon-mustard.html)",
      publishedAt: "Jan 11, 2018",
      publishedBy: "Fouad"
    }
  }
};

export function fetchPosts() {
  return dispatch => {
    dispatch({
      type: FETCH_POSTS,
      payload: Object.values(source.posts).reverse()
    });
  };
}



export function createPost(values, callback) {
  source.posts[values["id"]] = values;
  callback();
  return {
    type: CREATE_POST
  };
}

export function updatePost(values, callback) {
  let originPost = source.posts[values["id"]];
  originPost["title"] = values["title"];
  originPost["content"] = values["content"];
  originPost["categories"] = values["categories"];

  callback();
  return {
    type: UPDATE_POST
  };
}
export function fetchPost(id) {
  return dispatch => {
    dispatch({
      type: FETCH_POST,
      payload: source.posts[id]
    });
  };
}
export function searchPosts(cate) {
  let { posts } = source;
  let result = [];
  _.map(posts, post => {
    if (post.categories === cate) {
      result.push(post);
    }
  });
  return dispatch => {
    dispatch({
      type: SEARCH_POSTS,
      payload: result.reverse()
    });
  };
}

export function deletePost(id, callback) {
  source.posts[id] = null;
  delete source.posts[id];
  callback();
  return {
    type: DELETE_POST,
    payload: id
  };
}
