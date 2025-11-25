import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>();

  private destroyRef = inject(DestroyRef);
  userName = '';
  private usersServices = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);

  // userName = computed(() => this.usersServices.users.find((u) => u.id === this.userId())?.name);

  ngOnInit(): void {
    console.log(this.activatedRoute);
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName = this.usersServices.users.find((u) => u.id === paramMap.get('userId'))?.name || '';
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());

    // why subscription? ngOnInit will NOT be executed again and again. Hence a subscription is required to be notified about changes. And modify the data that depends on it.
  }
}

