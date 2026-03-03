import Array "mo:core/Array";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

actor {
  // Data Models
  type ProjectCategory = { #livingRoom; #bedroom; #kitchen; #bathroom; #office; #commercial };

  type ProductCategory = { #furniture; #lighting; #decor; #textiles };

  type Project = {
    id : Nat;
    title : Text;
    category : ProjectCategory;
    description : Text;
    year : Nat;
    images : [Text];
  };

  type Service = {
    id : Nat;
    title : Text;
    description : Text;
    features : [Text];
    priceRange : ?Text;
  };

  type Product = {
    id : Nat;
    title : Text;
    category : ProductCategory;
    description : Text;
    price : Float;
  };

  type TeamMember = {
    id : Nat;
    name : Text;
    role : Text;
    bio : Text;
    image : Text;
  };

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // Queues for ID generation
  var nextProjectId = 7;
  var nextServiceId = 5;
  var nextProductId = 6;
  var nextTeamMemberId = 3;
  var nextContactId = 1;

  // Maps for persistent storage
  let projects = Map.empty<Nat, Project>();
  let services = Map.empty<Nat, Service>();
  let products = Map.empty<Nat, Product>();
  let teamMembers = Map.empty<Nat, TeamMember>();
  let contacts = Map.empty<Nat, ContactSubmission>();

  // Helper function for admin check
  func isAdmin(caller : Principal) : Bool {
    caller.isAnonymous();
  };

  // Pre-seeded data
  let initialProjects : [Project] = [
    {
      id = 1;
      title = "Modern Loft Living Room";
      category = #livingRoom;
      description = "A spacious loft-style living room with minimalist design and natural materials.";
      year = 2022;
      images = ["/images/projects/loft1.jpg", "/images/projects/loft2.jpg"];
    },
    {
      id = 2;
      title = "Elegant Bedroom Suite";
      category = #bedroom;
      description = "A serene bedroom retreat with custom millwork and layered textures.";
      year = 2021;
      images = ["/images/projects/bedroom1.jpg"];
    },
    {
      id = 3;
      title = "Contemporary Kitchen Remodel";
      category = #kitchen;
      description = "Open-concept kitchen with high-end appliances and bespoke cabinetry.";
      year = 2023;
      images = ["/images/projects/kitchen1.jpg", "/images/projects/kitchen2.jpg"];
    },
    {
      id = 4;
      title = "Spa-Inspired Bathroom";
      category = #bathroom;
      description = "Luxurious bathroom with freestanding tub and heated floors.";
      year = 2022;
      images = ["/images/projects/bathroom1.jpg"];
    },
    {
      id = 5;
      title = "Home Office Transformation";
      category = #office;
      description = "Functional and stylish home office with custom storage solutions.";
      year = 2021;
      images = ["/images/projects/office1.jpg"];
    },
    {
      id = 6;
      title = "Chic Boutique Interior";
      category = #commercial;
      description = "High-end boutique with custom displays and ambient lighting.";
      year = 2023;
      images = ["/images/projects/commercial1.jpg"];
    },
  ];

  let initialServices : [Service] = [
    {
      id = 1;
      title = "Full Interior Design";
      description = "Comprehensive design service from concept to completion.";
      features = [
        "Space Planning",
        "Material Selection",
        "Custom Furniture Design",
        "Project Management",
      ];
      priceRange = ?"From $10,000";
    },
    {
      id = 2;
      title = "Room Refresh";
      description = "Quick update for a single room with new furnishings and decor.";
      features = [
        "Color Consultation",
        "Furniture Selection",
        "Accessory Sourcing",
      ];
      priceRange = ?"From $2,500";
    },
    {
      id = 3;
      title = "E-Design Package";
      description = "Remote design service with digital mood boards and shopping lists.";
      features = [
        "Concept Boards",
        "Floor Plans",
        "Product Sourcing",
      ];
      priceRange = ?"From $1,000";
    },
    {
      id = 4;
      title = "Commercial Design";
      description = "Customized design solutions for retail, hospitality, and office spaces.";
      features = [
        "Brand Integration",
        "Space Optimization",
        "Lighting Design",
      ];
      priceRange = ?"From $15,000";
    },
  ];

  let initialProducts : [Product] = [
    {
      id = 1;
      title = "Mid-Century Sofa";
      category = #furniture;
      description = "Elegant 3-seater sofa with walnut legs and velvet upholstery.";
      price = 2200.0;
    },
    {
      id = 2;
      title = "Artisanal Ceramic Vase";
      category = #decor;
      description = "Handcrafted ceramic vase with unique glaze finish.";
      price = 85.0;
    },
    {
      id = 3;
      title = "Pendant Light Fixture";
      category = #lighting;
      description = "Modern pendant light with brushed brass and opal glass.";
      price = 320.0;
    },
    {
      id = 4;
      title = "Wool Area Rug";
      category = #textiles;
      description = "Soft handwoven rug with subtle geometric pattern.";
      price = 650.0;
    },
    {
      id = 5;
      title = "Reclaimed Wood Coffee Table";
      category = #furniture;
      description = "Rustic coffee table made from sustainable reclaimed wood.";
      price = 790.0;
    },
  ];

  let initialTeamMembers : [TeamMember] = [
    {
      id = 1;
      name = "Elara Mason";
      role = "Founder & Lead Designer";
      bio = "Elara brings over 15 years of experience in residential and commercial interior design.";
      image = "/images/team/elara.jpg";
    },
    {
      id = 2;
      name = "Samantha Lee";
      role = "Senior Designer";
      bio = "Samantha specializes in contemporary interiors with a focus on sustainable materials.";
      image = "/images/team/samantha.jpg";
    },
  ];

  // Seed data on first deployment
  public shared ({ caller }) func initialize() : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can initialize data");
    };

    for (project in initialProjects.values()) {
      projects.add(project.id, project);
    };

    for (service in initialServices.values()) {
      services.add(service.id, service);
    };

    for (product in initialProducts.values()) {
      products.add(product.id, product);
    };

    for (member in initialTeamMembers.values()) {
      teamMembers.add(member.id, member);
    };
  };

  // Project Management
  public shared ({ caller }) func addProject(
    title : Text,
    category : ProjectCategory,
    description : Text,
    year : Nat,
    images : [Text],
  ) : async Nat {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can add projects");
    };

    let id = nextProjectId;
    nextProjectId += 1;

    let project : Project = {
      id;
      title;
      category;
      description;
      year;
      images;
    };

    projects.add(id, project);
    id;
  };

  public shared ({ caller }) func updateProject(
    id : Nat,
    title : Text,
    category : ProjectCategory,
    description : Text,
    year : Nat,
    images : [Text],
  ) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can update projects");
    };

    let project : Project = {
      id;
      title;
      category;
      description;
      year;
      images;
    };

    projects.add(id, project);
  };

  public shared ({ caller }) func deleteProject(id : Nat) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can delete projects");
    };

    projects.remove(id);
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    projects.values().toArray();
  };

  // Service Management
  public shared ({ caller }) func addService(
    title : Text,
    description : Text,
    features : [Text],
    priceRange : ?Text,
  ) : async Nat {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can add services");
    };

    let id = nextServiceId;
    nextServiceId += 1;

    let service : Service = {
      id;
      title;
      description;
      features;
      priceRange;
    };

    services.add(id, service);
    id;
  };

  public shared ({ caller }) func updateService(
    id : Nat,
    title : Text,
    description : Text,
    features : [Text],
    priceRange : ?Text,
  ) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can update services");
    };

    let service : Service = {
      id;
      title;
      description;
      features;
      priceRange;
    };

    services.add(id, service);
  };

  public shared ({ caller }) func deleteService(id : Nat) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can delete services");
    };

    services.remove(id);
  };

  public query ({ caller }) func getAllServices() : async [Service] {
    services.values().toArray();
  };

  // Product Management
  public shared ({ caller }) func addProduct(
    title : Text,
    category : ProductCategory,
    description : Text,
    price : Float,
  ) : async Nat {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can add products");
    };

    let id = nextProductId;
    nextProductId += 1;

    let product : Product = {
      id;
      title;
      category;
      description;
      price;
    };

    products.add(id, product);
    id;
  };

  public shared ({ caller }) func updateProduct(
    id : Nat,
    title : Text,
    category : ProductCategory,
    description : Text,
    price : Float,
  ) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can update products");
    };

    let product : Product = {
      id;
      title;
      category;
      description;
      price;
    };

    products.add(id, product);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can delete products");
    };

    products.remove(id);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  // Team Management
  public shared ({ caller }) func addTeamMember(
    name : Text,
    role : Text,
    bio : Text,
    image : Text,
  ) : async Nat {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can add team members");
    };

    let id = nextTeamMemberId;
    nextTeamMemberId += 1;

    let member : TeamMember = {
      id;
      name;
      role;
      bio;
      image;
    };

    teamMembers.add(id, member);
    id;
  };

  public shared ({ caller }) func updateTeamMember(
    id : Nat,
    name : Text,
    role : Text,
    bio : Text,
    image : Text,
  ) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can update team members");
    };

    let member : TeamMember = {
      id;
      name;
      role;
      bio;
      image;
    };

    teamMembers.add(id, member);
  };

  public shared ({ caller }) func deleteTeamMember(id : Nat) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can delete team members");
    };

    teamMembers.remove(id);
  };

  public query ({ caller }) func getAllTeamMembers() : async [TeamMember] {
    teamMembers.values().toArray();
  };

  // Contact Form
  public shared ({ caller }) func submitContact(
    name : Text,
    email : Text,
    subject : Text,
    message : Text,
  ) : async Nat {
    let id = nextContactId;
    nextContactId += 1;

    let submission : ContactSubmission = {
      id;
      name;
      email;
      subject;
      message;
      timestamp = Time.now();
    };

    contacts.add(id, submission);
    id;
  };

  public shared ({ caller }) func getAllContacts() : async [ContactSubmission] {
    if (not isAdmin(caller)) {
      Runtime.trap("Only admin can view contact submissions");
    };

    contacts.values().toArray();
  };
};
