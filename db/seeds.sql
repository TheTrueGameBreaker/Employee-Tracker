INSERT INTO department (name)
VALUES ("Leadership"),
       ("Marketing"),
       ("Production");

INSERT INTO role (title, salary, department_id)
VALUES ("President", 321987, 1),
       ("Vice President", 210456, 1),

       ("Marketing Manager", 129654, 2),
       ("Marketing Production", 98765, 2),

       ("Production Manager", 178955, 3),
       ("Production Staff", 154321, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chris", "John", 1, NULL),
       ("Brian", "Thomas", 2, 1),
       ("Matt", "Vincet", 3, NULL), 
       ("Marv", "John", 4, 3),
       ("Evelyn", "Rose",5, NULL),
       ("Ethan", "Smith", 6, 5),
       ("Jessie", "Baker", 7, NULL),
       ("Nan", "Ham",8, 7);